using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors.Infrastructure;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("FrontendPolicy", policy =>
//     {
//         policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
//         .AllowAnyHeader()
//         .AllowAnyMethod()
//         .AllowCredentials();
//     });
// });
var app = builder.Build();
app.UseCors( x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));
//app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("*"));



//app.UseRouting();
//app.UseCors("FrontendPolicy");
app.UseCors();
//app.UseAuthorization();

app.MapControllers();

app.Run();



