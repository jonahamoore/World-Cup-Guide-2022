using System.Collections.Generic;
using World_Cup_Guide_2022.Models;


namespace World_Cup_Guide_2022.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetPostById(int id);
        void Add(Post post);
        void Delete(int postId);       
        void UpdatePost(Post post);
    }
}