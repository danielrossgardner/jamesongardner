select id,name,email,message,LEFT(cast(cast(sent_date as date) as varchar),10) as SentDate, LEFT(cast(cast(sent_date as time)as varchar),5) as SentTime
from messages
where read = false
order by sent_date;
