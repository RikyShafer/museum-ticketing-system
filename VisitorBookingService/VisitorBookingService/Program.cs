using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ���� �� �������� �-Controllers
builder.Services.AddControllers();

// ���� �� Swagger
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

// ���� CORS (Cross-Origin Resource Sharing) ���� �������� �- Angular (localhost:4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // ���� �� �-URL �� ����� ���
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ���� �� Swagger �� ���� �����
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Visitor Booking API v1");
        c.RoutePrefix = string.Empty; // ���� �� Swagger ������ ������ �����
    });
}

// ����� �-CORS
app.UseCors("AllowLocalhost");

// ���� ���� ����� �-Controllers
app.MapControllers();

app.Run();
