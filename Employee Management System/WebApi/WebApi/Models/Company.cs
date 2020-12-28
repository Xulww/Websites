using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Company
    {
        public long CompanyID { get; set; }
        public string CompanyName { get; set; }
        public DateTime CompanyCreated { get; set; }
        public string CompanyStreetName { get; set; }
        public int CompanyStreetNumber { get; set; }
        public string CompanyCEOName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}