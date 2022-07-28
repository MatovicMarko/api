using System;

namespace Advertisement_Api.Models
{
    public class TokenDTO
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }

    }
}
