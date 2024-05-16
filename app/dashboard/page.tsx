import { currentUser } from '@clerk/nextjs/server';
import { Layout } from 'antd';
import { Header, Footer, Content } from 'antd/lib/layout/layout';
import ClientsideDashboard from '@/components/ClientsideDashboard';
import { getExpenses } from '@/actions/expenses';
import { UserButton } from '@clerk/nextjs';

import style from './page.module.css';

export default async function Dashboard() {
  const user = await currentUser();
  
  // Clerk should auto-redirect to the login page if the user is not signed in
  // so this is just a sanity check
  if (!user) return <div>Not signed in</div>;

  // This is only done on the server side
  const expenses = await getExpenses(user.id);

  return (
    <Layout>
      <Header>
        <div className={style.headerContent}>
          <span style={{color: "white"}}>Hello, {user?.fullName}</span>
          <UserButton />
        </div>
      </Header>
      <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
        <ClientsideDashboard expenseRows={expenses} />
      </Content>
      <Footer style={{ textAlign: "right" }}>
        {"Made with <3 and little to no personal finance knowledge"}
      </Footer>
    </Layout>
  );
}
