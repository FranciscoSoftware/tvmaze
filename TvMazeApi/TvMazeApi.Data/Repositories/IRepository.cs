using System;
using System.Collections.Generic;
using System.Text;

namespace TvMazeApi.Data.Models.Repositories
{
    public interface IRepository <T> where  T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int Id);
        T Insert(T obj);
        void Delete(int id);
        void Update(T obj);
    }
}
