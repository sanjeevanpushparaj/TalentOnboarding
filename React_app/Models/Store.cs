using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React_app.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int StoreId { get; set; }

        [Required(ErrorMessage = "Name Required")]
        [MaxLength(30, ErrorMessage = "cannot be more than 30 characters")]
        public string StoreName { get; set; }

        [Required(ErrorMessage = "Address Required")]
        [MaxLength(100, ErrorMessage = "cannot be more than 100 characters")]
        public string StoreAddress { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
