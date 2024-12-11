using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;  // הוסף את השורה הזו
using System.IO;
using System.Linq;
using System.Xml;
using VisitorBookingService.Models;

namespace VisitorBookingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlotsController : ControllerBase
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "slots.json");

        // קריאה של כל הזמנים מהשרת
        [HttpGet]
        public IActionResult GetSlots()
        {
            try
            {
                var jsonData = System.IO.File.ReadAllText(_filePath);
                var slots = JsonConvert.DeserializeObject<List<Slot>>(jsonData);
                return Ok(slots);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error reading data: {ex.Message}");
            }
        }

        // עדכון כמות המקומות
        [HttpPost("update")]
        public IActionResult UpdateSlot([FromBody] SlotUpdateRequest request)
        {
            try
            {
                var jsonData = System.IO.File.ReadAllText(_filePath);
                var slots = JsonConvert.DeserializeObject<List<Slot>>(jsonData);

                // מציאת המשבצת לפי שעה
                var slot = slots.FirstOrDefault(s => s.StartTime == request.StartTime);
                if (slot == null)
                {
                    return NotFound("Slot not found");
                }

                if (slot.AvailablePlaces < request.VisitorCount)
                {
                    return BadRequest("Not enough available places");
                }

                // עדכון כמות המקומות
                slot.AvailablePlaces -= request.VisitorCount;

                // שמירת השינויים לקובץ
                System.IO.File.WriteAllText(_filePath, JsonConvert.SerializeObject(slots, Newtonsoft.Json.Formatting.Indented));


                return Ok(new { success = true, slot });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating slot: {ex.Message}");
            }
        }

        // מחלקת בקשה לעדכון המשבצת
        public class SlotUpdateRequest
        {
            public string StartTime { get; set; } // שעת ההתחלה
            public int VisitorCount { get; set; } // כמות המבקרים
        }
    }
}
