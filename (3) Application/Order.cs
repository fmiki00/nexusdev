namespace NexusDev_Dashboard
{
    public class Order(int orderId , int userId, string emailAddress, string message, string colorPalette, string thematic, string logoUrl)
    {
        public int OrderId { get; } = orderId;
        public int UserId { get; } = userId;
        public string EmailAddress { get; } = emailAddress;
        public string Message { get; } = message;
        public string ColorPalette { get; } = colorPalette;
        public string Thematic { get; } = thematic;
        public string LogoUrl { get; } = logoUrl;
    }
}