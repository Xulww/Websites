using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace University.Models
{
    public class Partner
    {
        public int PartnerID { get; set; }
        public string PartnerName { get; set; }

        //virtual so we can load the data only if we need them
        //storing a list of all lectortopartner records which are related to the current lector record
        public virtual ICollection<LectorToPartner> LectorsToPartners { get; set; }
    }
}