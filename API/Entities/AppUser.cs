using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser
{
    public string Id { get ; set ; } =Guid.NewGuid().ToString();
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    //public string? RefreshToken { get; set; }
    //public DateTime? RefreshTokenExpiry { get; set; }

    // Nav property
    //public Member Member { get; set; } = null!;
}

