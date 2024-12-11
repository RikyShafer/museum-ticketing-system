using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// הוסף את השירותים ל-Controllers
builder.Services.AddControllers();

// הוסף את Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Visitor Booking API",
        Version = "v1",
        Description = "API for managing visitor booking slots"
    });
});

// הוסף CORS (Cross-Origin Resource Sharing) עבור אפליקציה ב- Angular (localhost:4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // הוסף את ה-URL של הלקוח שלך
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// הפעל את Swagger רק במצב פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Visitor Booking API v1");
        c.RoutePrefix = string.Empty; // פותח את Swagger ישירות מכתובת הבסיס
    });
}

// השתמש ב-CORS
app.UseCors("AllowLocalhost");

// וודא שאתה משתמש ב-Controllers
app.MapControllers();

app.Run();
