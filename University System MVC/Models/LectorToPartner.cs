using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace University.Models
{
    public class LectorToPartner
    {
        public int LectorToPartnerID { get; set; }
        public int LectorID { get; set; }
        public int PartnerID { get; set; }

        //virtual so entity framework can load the only when we try to access them
        //holding instances of lector and partner object so we can have easy access to the data
        public virtual Lector Lector { get; set; }
        public virtual Partner Partner { get; set; }
    }
}