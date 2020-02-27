using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using University.Models;

namespace University.Controllers
{
    public class PartnersController : Controller
    {
        private MyDbContext db = new MyDbContext();

        //get method that displays the list of partners
        public ActionResult Index()
        {
            return View(db.Partners.ToList());
        }

        //get method that displays the details about a given partner using the id
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Partner partner = db.Partners.Find(id);

            if (partner == null)
            {
                return HttpNotFound();
            }

            return View(partner);
        }

        public ActionResult Create()
        {
            return View();
        }

        //once the information is recieved from the form of the create method, add and save it to the database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PartnerID,PartnerName")] Partner partner)
        {
            if (ModelState.IsValid)
            {
                db.Partners.Add(partner);
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(partner);
        }

        //get method that finds and returns the partner based on the id
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Partner partner = db.Partners.Find(id);

            if (partner == null)
            {
                return HttpNotFound();
            }
            return View(partner);
        }

        //giving and saving the information recieved from the form to the database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PartnerID,PartnerName")] Partner partner)
        {
            if (ModelState.IsValid)
            {
                db.Entry(partner).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(partner);
        }

        //getting the id of the chosen partner
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Partner partner = db.Partners.Find(id);

            if (partner == null)
            {
                return HttpNotFound();
            }

            return View(partner);
        }

        //deleting the partner based on the id
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Partner partner = db.Partners.Find(id);

            db.Partners.Remove(partner);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
