--USE [master]

--IF db_id('WorldCup2022') IS NULl
--  CREATE DATABASE [Tabloid]
--GO

--USE [WorldCup2022]
--GO

--DROP TABLE IF EXISTS [Comment];
--DROP TABLE IF EXISTS [Post];
--DROP TABLE IF EXISTS [UserProfile];
--DROP TABLE IF EXISTS [UserType];
--GO


--first table
--CREATE TABLE [UserProfile] (
--  [Id] integer PRIMARY KEY identity NOT NULL,
--  [DisplayName] nvarchar(255) NOT NULL,
--  [Email] nvarchar(255) NOT NULL,
--  [UserTypeId] integer NOT NULL,
--)
--GO

--Select * From UserProfile
--first table insert example
--SET IDENTITY_INSERT [UserProfile] ON
--INSERT INTO [UserProfile]
--  ([Id], [DisplayName], [Email], [UserTypeId])
--VALUES 
--  (1, 'jonahmoore10', 'jonahamoore@gmail.com', 1);
--select * from userprofile
--SET IDENTITY_INSERT [UserProfile] OFF

--second table 
--CREATE TABLE [Post] (
--  [Id] integer PRIMARY KEY identity NOT NULL,
--  [Title]  nvarchar(255) NOT NULL,
--  [ImageUrl] nvarchar(255) NOT NULL,
--  [Content] nvarchar(255),
--  [UserProfileId] integer NOT NULL,
--)
--GO
--second table insert statement

--SET IDENTITY_INSERT [Post] ON
--INSERT INTO [Post]
--  ([Id], [Title], [ImageUrl], [Content], [UserProfileId] )
--VALUES
--  (1, 'Top 3 Players to root for in World Cup 2022', 'https://cdn.cnn.com/cnnnext/dam/assets/220327082746-04-christian-eriksen-goal-super-169.jpg', 'The return of Christian Eriksen', 1)
--Select * From Post
--SET IDENTITY_INSERT [Post] OFF


--third table creation
--CREATE TABLE [Comment] (
--  [Id] integer PRIMARY KEY identity NOT NULL,
--  [UserProfileId] integer NOT NULL,
--  [Message] nvarchar(255) NOT NULL
--)
--GO
--insert statement for table 3
--SET IDENTITY_INSERT [Comment] ON
--INSERT INTO [Comment]
--  ([Id], [UserProfileId], [Message])
--VALUES
--  (1, 1, 'World Cup is the U.S. next time!');
--SET IDENTITY_INSERT [Comment] OFF
--Select * From Comment

--fourth table create
--CREATE TABLE [RatingScale] (
--  [Id] integer PRIMARY KEY identity NOT NULL,
--  [UserProfileId] integer NOT NULL,
--  [IconImageUrl] nvarchar(255) NOT NULL,
--  [caption] nvarchar(255) NOT NULL,
--)
--GO
--SET IDENTITY_INSERT [RatingScale] ON
--INSERT INTO [RatingScale]
--  ([Id], UserProfileId, IconImageUrl, caption)
--VALUES
--  (1, 1, 'https://ak.picdn.net/shutterstock/videos/32609950/thumb/11.jpg', 'Christian Erikson survived death itself and for that his story gets 5 out of 5 hearts');
--SET IDENTITY_INSERT [RatingScale] OFF
--Select * From RatingScale
--table 5
--CREATE TABLE [UserType] (
--  [Id] integer PRIMARY KEY identity NOT NULL,
--  [Name] nvarchar(255) NOT NULL,
--)
--GO
--SET IDENTITY_INSERT [UserType] ON
--INSERT INTO [UserType]
--  ([Id], [Name])
--VALUES
--  (1, 'admin');
--SET IDENTITY_INSERT [UserType] OFF
--altering tables to have foreign keys in them
--ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
--GO
--ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
--GO
--ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
--ratingscaleid needs to be added to foreign ids
--ALTER TABLE [RatingScale] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
--GO
--ALTER TABLE [Post] ADD FOREIGN KEY ([ratingScaleId]) REFERENCES [RatingScale] ([Id])
--GO
Select * From UserType