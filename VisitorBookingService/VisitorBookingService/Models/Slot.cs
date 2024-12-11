namespace VisitorBookingService.Models
{
    public class Slot
    {
        public string StartTime { get; set; } // שעת ההתחלה
        public int AvailablePlaces { get; set; } // כמות המקומות הזמינים
        public bool IsClosed { get; set; } // האם המשבצת סגורה
    }
}
