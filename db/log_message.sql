Insert Into messages (name,email,message,sent_date,read)
select $1,$2,$3,CURRENT_TIMESTAMP,$4;
