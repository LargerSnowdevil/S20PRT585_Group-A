using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock.Models
{
    public interface ItemRepository
    {
        Task<IEnumerable<Item>> GetItems();
        Task<Item> Search(string name);
        Task<Item> GetItem(int id);
        Task<Item> PutItem(int id, Item item);
        
        Task<Item> DeleteItem(int id);
        Task<Item> PostItem(Item item);


    }
}
