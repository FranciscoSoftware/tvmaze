using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Text;

namespace TvMazeApi.Data.Models.Repositories.Generic
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        public  TvMazeBdContext _context = null;
        private readonly DbSet<T> _table = null;
        

        public GenericRepository()
        {
            
            this._context = new TvMazeBdContext();
            this._table = this._context.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return this._table.ToList();
        }

        public T GetById(int id)
        {
            return this._table.Find(id);
        }
        public T Insert(T obj)
        {
            this._table.Add(obj);
            Save();
            return obj;
        }
        public void Update(T obj)
        {
            this._table.Attach(obj);
            this._context.Entry(obj).State = EntityState.Modified;
            Save();
        }
        public void Delete(int id)
        {
            T existing = _table.Find(id);
            _table.Remove(existing);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
