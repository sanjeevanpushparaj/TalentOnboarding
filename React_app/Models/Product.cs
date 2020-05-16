using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React_app.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int ProductId { get; set; }

        //[Required(ErrorMessage = "Name Required")]
        //[MaxLength(30, ErrorMessage = "cannot be more than 30 characters")]
        public string ProductName { get; set; }

        //[Required(ErrorMessage = "Price Required")]
        //[MaxLength(20, ErrorMessage = "cannot be more than 20 characters")]
        public decimal? ProductPrice { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
