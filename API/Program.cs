using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.MapControllers();


app.Run();

//dotnet dev-certs https -h
//dotnet tool list -g 
//dotnet tool list -g dotnet-ef
//dotnet ef
//dotnet ef migrations -h
//dotnet ef migrations add InitialCreate -o Data/Migrations
//dotnet ef migrations remove
//dotnet tool update -g dotnet-ef --version 10.0.14
//dotnet ef database update
//dotnet watch
//dotnet new gitignore