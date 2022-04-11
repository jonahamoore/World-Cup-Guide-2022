using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using World_Cup_Guide_2022.Models;

namespace World_Cup_Guide_2022.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
