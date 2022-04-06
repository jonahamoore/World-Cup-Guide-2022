using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using World_Cup_Guide_2022.Models;
using World_Cup_Guide_2022.Utils;

namespace World_Cup_Guide_2022.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.id, u.DisplayName, u.Email, u.UserTypeId,
                              ut.[Name] AS UserTypeName
                         FROM UserProfile u
                         LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                         ORDER BY u.DisplayName ASC;";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();

                    while (reader.Read())
                    {
                        users.Add(NewUserFromReader(reader));
                    }

                    reader.Close();

                    return users;
                }
            }
        }
        public UserProfile GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT u.id, u.DisplayName, u.Email, u.UserTypeId, ut.[Name] AS UserTypeName
                       
                      FROM UserProfile u  
                      LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                      WHERE u.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;

                    if (reader.Read())
                    {
                        user = NewUserFromReader(reader);
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.DisplayName, up.Email, up.UserTypeId,
                               ut.Name AS UserTypeName                             
                          FROM UserProfile up
                          LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = NewUserFromReader(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (DisplayName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@DisplayName, @Email, @UserTypeId)";

                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private UserProfile NewUserFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                Email = DbUtils.GetString(reader, "Email"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                UserType = new UserType()
                {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "UserTypeName"),
                }
            };
        }

        public List<UserType> GetUserTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                                        FROM UserType                    
                    ";

                    var reader = cmd.ExecuteReader();

                    var userTypes = new List<UserType>();
                    while (reader.Read())
                    {
                        userTypes.Add(new UserType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),

                        });
                    }

                    reader.Close();

                    return userTypes;
                }
            }
        }

        public void Delete(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Delete FROM UserProfile
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", userId);
                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
