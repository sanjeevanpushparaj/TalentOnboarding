using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_app.Models;

namespace React_app.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class SalesController : ControllerBase
    {
        private readonly practiceTaskContext _context;

        public SalesController(practiceTaskContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        //[HttpGet]
        public JsonResult GetSales()
        {
            try
            {
                var saleList = _context.Sales.Select(x => new {
                    x.SalesId,
                    x.CustomerId,
                    x.ProductId,
                    x.StoreId,
                    x.DateSold,
                    CustomerName = x.Customer.Name,
                    ProductName = x.Product.ProductName,
                    StoreName = x.Store.StoreName
                }).ToList();

                return new JsonResult (saleList);
            }
            catch (Exception e)
            {
                Console.Write("Exception Occured /n {0}", e.Data);
                return new JsonResult ( "Data Not Found" );
            }
        }

        // GET: api/Sales/5
        //[HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetASales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        public async Task<IActionResult> PutSales( Sales sales)
        {
            //if (id != sales.SalesId)
            //{
            //    return BadRequest();
            //}

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(sales.SalesId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return new JsonResult("Success");
            //return CreatedAtAction("GetSales", sales.SalesId, sales);
        }

        // DELETE: api/Sales/5
        //[HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.SalesId == id);
        }

        public JsonResult GetCustomers()
        {
            try
            {
                var Customerdata = _context.Customer.Select(p => new { p.CusId, CustomerName = p.Name }).ToList();

                return new JsonResult (Customerdata);
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult ( "Data Not Found" );
            }
        }

        public JsonResult GetStores()
        {
            try
            {
                var Storedata = _context.Store.Select(p => new { p.StoreId, StoreName = p.StoreName }).ToList();

                return new JsonResult( Storedata );
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult("Data Not Found");
            }
        }

        public JsonResult GetProducts()
        {
            try
            {
                var Storedata = _context.Product.Select(p => new { p.ProductId, ProductName = p.ProductName }).ToList();

                return new JsonResult( Storedata );
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult("Data Not Found");
            }
        }
    }
}
