using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors.Infrastructure;
using API.Interfaces;
using API.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using  API.Middleware;
{
    
}



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

builder.Services.AddScoped<ITokenServices, TokenServices>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenkey = builder.Configuration["TokenKey"]?? throw new InvalidOperationException("TokenKey is not configured.");
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {            
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenkey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
var app = builder.Build();

// Configure the Http request pipeline

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors( x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();



