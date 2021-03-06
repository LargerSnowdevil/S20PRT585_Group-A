﻿using COMMON;
using _DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL
{
    public interface IItemService
    {
        IEnumerable<ItemBll> GetItems();
        ItemBll GetItem(int id);
        Task PutItem(int id, ItemBll item);

        Task DeleteItem(int id);
        Task PostItem(ItemBll item);


    }

    public class ItemService : IItemService
    {
        private readonly ItemContext _context;

        public ItemService(ItemContext context)
        {
            _context = context;
        }

        public async Task DeleteItem(int id)
        {
            var item = _context.Items.Find(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo what happens if the item does not exist?
            }
        }

        public ItemBll GetItem(int id)
        {
            var efItem = _context.Items.Find(id);

            var retItem = new ItemBll
            {
                Id = efItem.ItemId,
                Name = efItem.Name,
                Image = efItem.Image
            };

            return retItem;
        }

        public IEnumerable<ItemBll> GetItems()
        {
            var efItems = _context.Items.ToList();
            var retItems = new List<ItemBll>();

            foreach (var item in efItems)
            {
                retItems.Add(new ItemBll
                {
                    Id = item.ItemId,
                    Name = item.Name,
                    Image = item.Image
                });
            }

            return retItems;
        }

        public async Task PostItem(ItemBll item)
        {
            //Todo set defualt image if none is supplyed
            var efItem = new Item
            {
                ItemId = item.Id,
                Name = item.Name,
                Image = item.Image
            };

            _context.Items.Add(efItem);
            await _context.SaveChangesAsync();
        }

        public async Task PutItem(int id, ItemBll item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efItem = _context.Items.Find(id);

            if (efItem != null)
            {
                efItem.Name = item.Name;
                efItem.Image = item.Image;

                _context.Items.Update(efItem);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo What happens if an item does not exist?
                //Do i need to return a failed task if the item does not exist?
            }
        }
    }
}
