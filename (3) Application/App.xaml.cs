using System.Drawing;
using System.Windows;
using System.Windows.Forms;
using System.Collections.Generic;
using Application = System.Windows.Application;

namespace NexusDev_Dashboard
{
    public partial class App : Application
    {
        public static NotifyIcon? notifyIcon;
        public static MainWindow? mainWindow;

        public static readonly string connectionString = "Server=localhost;Port=3307;Database=nexusdev;User Id=root;Password=;";

        public static List<Order> orders = [];
        public static IEnumerable<Order> filteredOrders = [];


        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            mainWindow = new();

            notifyIcon = new NotifyIcon
            {
                Text = "NexusDev - Dashboard",
                Icon = new Icon("./logo.ico"),
                Visible = true
            };

            ContextMenuStrip contextMenu = new ContextMenuStrip();
            contextMenu.Items.Add("Exit", null, (s, e) => Current.Shutdown());
            notifyIcon.ContextMenuStrip = contextMenu;

            mainWindow.Show();
        }

        public static void ShowBalloonMessage(string title, string message, ToolTipIcon icon)
        {
            notifyIcon!.ShowBalloonTip(3000, title, message, icon);
        }
    }
}