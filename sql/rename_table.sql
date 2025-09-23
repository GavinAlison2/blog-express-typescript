use php_blog_system;
insert into user select * from users;
insert into blog select * from blogs;
-- alter table users rename to user;
-- alter table blogs rename to blog;

-- 关闭外键检查
set foreign_key_checks = 0;
truncate table users;
truncate table blogs;
set foreign_key_checks = 1;
drop table blogs;
drop table users;

