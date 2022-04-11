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
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Content, p.ImageUrl, p.UserProfileId, u.DisplayName, u.Email, u.UserTypeId, ut.[Name]
                                           FROM Post p
                                           LEFT JOIN UserProfile u ON UserProfileId = u.Id
                                           LEFT JOIN UserType ut ON u.UserTypeId = ut.id";
                    var reader = cmd.ExecuteReader();

                    var Posts = new List<Post>();

                    while (reader.Read())
                    {
                        Posts.Add(new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("title")),
                            Content = reader.GetString(reader.GetOrdinal("content")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("userProfileId")),
                            UserProfile = new UserProfile()
                            {
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

                    return Posts;
                }
            }
        }



        
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, ImageUrl, Content, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title,  @ImageUrl, @Content,  @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageUrl", post.ImageUrl);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Delete FROM POST
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", postId);
                    cmd.ExecuteNonQuery();
                }
            }

        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT p.Id, p.Title, p.Content, p.ImageUrl, p.UserProfileId, u.Email, u.DisplayName, u.UserTypeId, ut.[Name]
                       FROM Post p
                       LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                       LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                           WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);

                    }
                    reader.Close();

                    return post;
                }
            }
        }
        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("title")),
                ImageUrl = reader.GetString(reader.GetOrdinal("imageUrl")),
                Content = reader.GetString(reader.GetOrdinal("content")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("userProfileId")),
                UserProfile = new UserProfile()
                {
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("userTypeId")),
                },
                UserType = new UserType()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    Name = reader.GetString(reader.GetOrdinal("name"))
                }
 
            };
        }
        public void UpdatePost(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Title = @title,
                               Content = @content,
                               ImageUrl = @imageUrl,
                               UserProfileId = @userProfileId                          
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@content", post.Content);
                    cmd.Parameters.AddWithValue("@imageUrl", post.ImageUrl);
                    cmd.Parameters.AddWithValue("@userProfileId", post.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
      
    }
}




