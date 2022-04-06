using System.ComponentModel.DataAnnotations;

namespace World_Cup_Guide_2022.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

    }
}
