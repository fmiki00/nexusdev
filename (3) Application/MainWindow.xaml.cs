using System;
using System.Linq;
using System.Windows;
using System.Windows.Forms;
using System.ComponentModel;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Collections.Generic;
using MessageBox = System.Windows.MessageBox;
using Application = System.Windows.Application;

namespace NexusDev_Dashboard
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Closing += MainWindow_Closing;
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string emailAddress = EmailAddressInput.Text;
            string password = PasswordInput.Password;

            if (string.IsNullOrWhiteSpace(emailAddress))
            {
                MessageBox.Show("Email address is required!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (emailAddress.Length > 320)
            {
                MessageBox.Show("Email address is too long!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }
            
            if (string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("Password is required!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (password.Length > 128)
            {
                MessageBox.Show("Password is too long!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            string query = "SELECT * FROM users WHERE email_address = @email_address AND password = @password AND owner_privileges = 1";

            using MySqlConnection connection = new(App.connectionString);
            using MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@email_address", emailAddress);
            command.Parameters.AddWithValue("@password", password);

            try
            {
                connection.Open();
                int userCount = Convert.ToInt32(command.ExecuteScalar());

                if (userCount > 0)
                {
                    MessageBox.Show("Login successful!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Information);

                    LoginGrid.Visibility = Visibility.Hidden;
                    DashboardGrid.Visibility = Visibility.Visible;

                    _ = Task.Run(GetOrdersRepeatly);
                }
                else
                {
                    MessageBox.Show("Invalid email address or password!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }

        private async Task GetOrdersRepeatly()
        {
            while (true)
            {
                await Application.Current.Dispatcher.InvokeAsync(async () =>
                {
                    await GetOrders();
                    await RefreshList(SearchBox.Text);
                });

                await Task.Delay(1000);
            }
        }

        private async Task GetOrders()
        {
            string query = @"SELECT o.order_id, o.user_id, u.email_address, o.message, o.color_palette, o.thematic, o.logo_url FROM orders o LEFT JOIN users u ON o.user_id = u.user_id";

            using MySqlConnection connection = new(App.connectionString);
            using MySqlCommand command = new(query, connection);

            try
            {
                connection.Open();
                using MySqlDataReader reader = command.ExecuteReader();

                List<Order> orders = [];

                while (reader.Read())
                {
                    int orderId = reader.GetInt32(0);
                    int userId = reader.GetInt32(1);
                    string emailAddress = reader.IsDBNull(2) ? "Email not found" : reader.GetString(2);
                    string message = reader.IsDBNull(3) ? "" : reader.GetString(3);
                    string colorPalette = reader.IsDBNull(4) ? "" : reader.GetString(4);
                    string thematic = reader.IsDBNull(5) ? "" : reader.GetString(5);
                    string logoUrl = reader.IsDBNull(6) ? "" : reader.GetString(6);

                    Order order = new(orderId, userId, emailAddress, message, colorPalette, thematic, logoUrl);
                    orders.Add(order);
                }

                foreach (Order order in orders)
                {
                    if (App.orders.Count > 0)
                    {
                        Order? searchedOrder = App.orders.FirstOrDefault(o => o.OrderId == order.OrderId);

                        if (searchedOrder == null)
                        {
                            App.ShowBalloonMessage("New Order", $"A new order has sent by {order.EmailAddress}!", ToolTipIcon.Info);
                        }
                    }
                }

                App.orders.Clear();
                App.orders = orders;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }

            await Task.CompletedTask;
        }

        private async Task RefreshList(string searchText)
        {
            int selectedIndex = OrdersList.SelectedIndex;

            OrdersList.Items.Clear();

            if (string.IsNullOrWhiteSpace(searchText))
            {
                App.filteredOrders = [];

                foreach (Order order in App.orders)
                {
                    OrdersList.Items.Add($"{order.EmailAddress} (Order ID: #{order.OrderId})");
                }
            }
            else
            {
                if (int.TryParse(searchText, out int orderId))
                {
                    App.filteredOrders = App.orders.Where(order => order.OrderId == orderId);
                }
                else
                {
                    App.filteredOrders = App.orders.Where(order => order.EmailAddress.Contains(searchText, StringComparison.OrdinalIgnoreCase));
                }

                foreach (Order order in App.filteredOrders)
                {
                    OrdersList.Items.Add($"{order.EmailAddress} (Order ID: #{order.OrderId})");
                }
            }

            OrdersList.SelectedIndex = selectedIndex >= 0 && selectedIndex < OrdersList.Items.Count ? selectedIndex : -1;

            await Task.CompletedTask;
        }

        private void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            _ = RefreshList(SearchBox.Text);
        }

        private void OrdersList_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (OrdersList.SelectedIndex >= 0 && OrdersList.SelectedIndex < App.orders.Count)
            {
                Order order = App.filteredOrders.ToList().Count > 0 ? App.filteredOrders.ToList()[OrdersList.SelectedIndex] : App.orders[OrdersList.SelectedIndex];

                OrderTitle.Text = $"{order.EmailAddress} (Order ID: #{order.OrderId})";
                MessageText.Text = $"Message: {order.Message}";
                ColorPaletteText.Text = $"Color palette: {order.ColorPalette}";
                ThematicText.Text = $"Thematic: {order.Thematic}";
                LogoUrlText.Text = $"Logo URL: {order.LogoUrl}";
                DeleteOrderButton.Visibility = Visibility.Visible;
            }
            else
            {
                OrderTitle.Text = "";
                MessageText.Text = "";
                ColorPaletteText.Text = "";
                ThematicText.Text = "";
                LogoUrlText.Text = "";
                DeleteOrderButton.Visibility = Visibility.Hidden;
            }
        }

        private void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            _ = RefreshList(SearchBox.Text);
        }

        private void OrderDeleteButton_Click(object sender, RoutedEventArgs e)
        {
            int order_id = App.filteredOrders.ToList().Count > 0 ? App.filteredOrders.ToList()[OrdersList.SelectedIndex].OrderId : App.orders[OrdersList.SelectedIndex].OrderId;
            string query = "DELETE FROM orders WHERE order_id = @order_id";

            using MySqlConnection connection = new(App.connectionString);
            using MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@order_id", order_id);

            try
            {
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    MessageBox.Show("Order deleted successfully!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Information);

                    _ = GetOrders();
                    _ = RefreshList(SearchBox.Text);
                }
                else
                {
                    MessageBox.Show("Order not found!", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "NexusDev - Dashboard", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void MainWindow_Closing(object? sender, CancelEventArgs e)
        {
            MessageBoxResult result = MessageBox.Show("Are you sure you want to exit?", "NexusDev - Dashboard", MessageBoxButton.YesNo, MessageBoxImage.Question);

            if (result == MessageBoxResult.No)
            {
                e.Cancel = true;
            }
        }
    }
}