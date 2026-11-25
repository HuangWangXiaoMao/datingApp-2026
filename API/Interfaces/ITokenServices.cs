using API.Entities;

namespace API.Interfaces;

public interface ITokenServices
{
    Task<string> CreateTokenAsync(AppUser user);
    string GenerateRefreshToken();
}
