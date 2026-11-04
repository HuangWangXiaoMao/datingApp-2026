using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUseExtensions
{
    public static UserDTO ToDto(this AppUser user, ITokenServices tokenServices)
    {
        return new UserDTO
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,            
            Token = tokenServices.CreateToken(user)
        };
    }
}
