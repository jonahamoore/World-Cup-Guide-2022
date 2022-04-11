using Microsoft.AspNetCore.Mvc;
using World_Cup_Guide_2022.Models;
using World_Cup_Guide_2022.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace World_Cup_Guide_2022.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        
        [HttpGet]
        public IActionResult GetAllComments()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);

            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }



        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Comment(Comment comment)
        {
            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.UpdateComment(comment);
            return NoContent();
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }
    }
}
