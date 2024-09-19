import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { RaulBreadcrumbs, RaulCheckbox, RaulEyebrow } from "@realpage/react-raul";
import './global.css'
import {
  RaulButton,
  RaulGrid,
  RaulGridBody,
  RaulGridCell,
  RaulGridHeader,
  RaulGridRow,
  RaulInput,
  RaulDropdown,
  RaulDropdownItem,
  RaulPagingBar,
} from '@realpage/react-raul';
import { SnackbarContext } from '@realpage/rum-react-library';
import { getUsers, deleteUser } from '@/services'; // Assuming these services exist
import { RaulPagingBarCustomEvent } from '@realpage/raul-library';

interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<string[]>(['Admin', 'Consultant', 'Supervisor']);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);

//   const snackbar = useContext(SnackbarContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, currentPage]);

  const fetchUsers = async () => {
    setIsLoading(true);
    
  };

  const filterUsers = () => {
    const filtered = users.filter(user =>
      (selectedRole ? user.role === selectedRole : true) &&
      (searchTerm ? user.username.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
    setFilteredUsers(filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
    setTotalRows(filtered.length);
  };

  const handlePagingChange = (e: RaulPagingBarCustomEvent<{ currentPage: number; rowsPerPage: number }>) => {
    setCurrentPage(e.detail.currentPage);
    setRowsPerPage(e.detail.rowsPerPage);
  };

  const handleDeleteUser = async () => {
    
  };

  return (
    
    <div className="r-mx-12 r-mt-8">
        <RaulBreadcrumbs>
            <RaulEyebrow />
        </RaulBreadcrumbs>
        <h1 className=' .r-heading-hero .r-font-bold'>Inplicit</h1>
        <div className="r-flex r-mb-8">
            <RaulInput className="r-mx-2 r-w-2/5" label="Users" type="search">
            <input
                type="text"
                placeholder="Select User"
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            </RaulInput>

            <RaulDropdown
            label="PMC"
            placeholderText="Select PMC"
            className="r-w-1/5 r-mx-2"
            value={selectedRole || ''}
            onRaulChange={e => setSelectedRole(e.detail.value)}
            >
            <RaulDropdownItem text="All" value="" />
            {roles.map((role, index) => (
                <RaulDropdownItem key={index} text={role} value={role} />
            ))}
            </RaulDropdown>

            <div className="r-mt-6 r-flex">
              <RaulButton
                variant="primary"
                className="r-mx-2"
                type="submit"
                onClick={() => searchFieldsForm.handleSubmit()}>
                Search
              </RaulButton>

              <RaulButton
                variant="primary"
                className="r-mx-2"
                type="submit"
                onClick={() => searchFieldsForm.handleSubmit()}>
                Add Invoice
              </RaulButton>

              <RaulButton variant="danger" className="r-mx-2" onClick={() => searchFieldsForm.resetForm()}>
                delete
              </RaulButton>
            </div>
            
        </div>
      

            

      {
        <RaulGrid striped={true} hoverable={true}>
          <RaulGridHeader>
            <RaulGridRow>
            <RaulGridCell style={{ width: '100px' }}>
                        <RaulCheckbox>
                          <input
                            type="checkbox"
                            name="selectAll"
                            // onChange={e => handleSelectAll(e)}
                            // checked={isSelectAll}
                          />
                        </RaulCheckbox>
                      </RaulGridCell>
              <RaulGridCell>Invoice Id</RaulGridCell>
              <RaulGridCell>PMC</RaulGridCell>
              <RaulGridCell>Site Name</RaulGridCell>
              <RaulGridCell>Vendor Name</RaulGridCell>
              <RaulGridCell>Prior Balance</RaulGridCell>
            </RaulGridRow>
          </RaulGridHeader>

          <RaulGridBody>
            {filteredUsers.map(user => (
              <RaulGridRow key={user.id}>
                <RaulGridCell>{user.id}</RaulGridCell>
                <RaulGridCell>{user.username}</RaulGridCell>
                <RaulGridCell>{user.email}</RaulGridCell>
                <RaulGridCell>{user.role}</RaulGridCell>
                <RaulGridCell>
                  <RaulButton
                    variant="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </RaulButton>
                </RaulGridCell>
              </RaulGridRow>
            ))}
          </RaulGridBody>
        </RaulGrid>
      }

      <RaulPagingBar
        totalRows={totalRows}
        onPagingChange={handlePagingChange}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default Users;
