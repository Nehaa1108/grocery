const verifyEmailTemplate = ({name,url})=>
{
return `
<p>Dear ${name}</p>
<p>Thank You for registration Grocify.</p>
<a href=${url}
style="color:white;
background:blue;
margin-top:10px"
>Verify Email
</a>`

}

export default verifyEmailTemplate