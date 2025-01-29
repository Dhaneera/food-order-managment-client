import { redirect } from 'next/navigation';


function routeToTheLogin(){
    const userId=sessionStorage.getItem('userId');
    const role=sessionStorage.getItem('role');
    if(userId==null || role==null || userId=='' || role==''){
    redirect('/login');
    }
}

export default routeToTheLogin;