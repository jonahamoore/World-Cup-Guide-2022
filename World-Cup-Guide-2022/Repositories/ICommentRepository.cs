using System.Collections.Generic;
using World_Cup_Guide_2022.Models;

namespace World_Cup_Guide_2022.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
        void AddComment(Comment comment);
        void DeleteComment(int commentId);
        void UpdateComment(Comment comment);
    }
}
