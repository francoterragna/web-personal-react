import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from 'semantic-ui-react';
import { Newsletter } from '../../../../api';
import { size, map } from 'lodash';
import { useAuth } from '../../../../hooks';
import { EmailItem } from '../EmailItem';
import './ListEmails.scss';

const newsletterController = new Newsletter();


export function ListEmails() {
    const [emails, setEmails] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1)
    const { accessToken } = useAuth();
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevState) => !prevState);

    
    useEffect(() => {
        (async () => {
            try {
                const response = await newsletterController.getEmails(accessToken, page);
                setEmails(response.docs);
                console.log(response);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.totalPages,
                    total: response.totalDocs
                })
            } catch (error) {
                console.error(error);
            }
        })();
    }, [page, reload]);

    const changePage = (_, data) => {
        setPage(data.activePage)
    }

   if(!emails) return <Loader active inline='centered'/>
   if(size(emails) === 0 ) return 'No hay emails registrados';

  return ( 
    <div className='list-emails' >
        {map(emails, (email) => <EmailItem key={email._id} email={email} onReload={onReload} />)}

        <div className='list-emails__pagination'>
            <Pagination
                totalPages= {pagination.pages}
                defaultActivePage={pagination.page}
                ellipsisItem={null}
                firstItem={false}
                lastItem={false}
                onPageChange={changePage}
            />
        </div> 
    </div>
     )
}
