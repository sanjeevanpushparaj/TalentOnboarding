using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React_app.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int CusId { get; set; }

        //[Required]
        //[MaxLength(30, ErrorMessage = "cannot be more than 30 characters")]
        public string Name { get; set; }

        //[Required]
        //[MaxLength(100, ErrorMessage = "cannot be more than 100 characters")]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
