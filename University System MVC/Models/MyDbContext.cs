using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace University.Models
{
    public class MyDbContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public MyDbContext() : base("Server=YourServerHere;Database=MyDbContext;Trusted_Connection=True;")
        {
        }

        public System.Data.Entity.DbSet<University.Models.Faculty> Faculties { get; set; }

        public System.Data.Entity.DbSet<University.Models.Student> Students { get; set; }

        public System.Data.Entity.DbSet<University.Models.Lector> Lectors { get; set; }

        public System.Data.Entity.DbSet<University.Models.Partner> Partners { get; set; }

        public System.Data.Entity.DbSet<University.Models.LectorToPartner> LectorsToPartners { get; set; }

    }
}
