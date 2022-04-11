using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using World_Cup_Guide_2022.Models;
using World_Cup_Guide_2022.Repositories;
using World_Cup_Guide_2022.Utils;
using World_Cup_Guide_2022.Models;
using World_Cup_Guide_2022.Utils;


namespace World_Cup_Guide_2022.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id AS commentId, c.UserProfileId, c.Message, u.DisplayName, u.Email,  u.UserTypeId, ut.[Name]
                                           FROM Comment c
                                           LEFT JOIN UserProfile u ON u.Id = c.UserProfileId
                                           LEFT JOIN UserType ut ON u.UserTypeId = ut.id";                                         
                 
                    var reader = cmd.ExecuteReader();

                    var Comments = new List<Comment>();

                    while (reader.Read())
                    {
                        Comments.Add(new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("commentId")),
                            Message = reader.GetString(reader.GetOrdinal("message")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("userProfileId")),
                            UserProfile = new UserProfile()
                            {
                                Id= reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("Name"))
                                }
                            }
                        });
                    }

                    reader.Close();

                    return Comments;
                }
            }
        }




        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (Message, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Message, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Message", comment.Message);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteComment(int commentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Delete FROM Comment
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", commentId);
                    cmd.ExecuteNonQuery();
                }
            }

        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT c.Id, c.Message, c.UserProfileId
                       FROM Comment c
                       LEFT JOIN UserProfile u  ON c.UserProfileId = u.id
                           WHERE c.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;
                    if (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Message = DbUtils.GetString(reader, "Message"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")       
                        };
                    }
                    reader.Close();

                    return comment;
                }
            }
        }
        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Message = reader.GetString(reader.GetOrdinal("message")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("userProfileId")),
                UserProfile = new UserProfile()
                {
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("userTypeId")),

                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("name"))
                    }
                }

            };
        }
        public void UpdateComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                           SET Message = @message,
                               UserProfileId = @userProfileId                          
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@message", comment.Message);                    
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}




