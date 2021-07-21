import React, { useEffect, useState } from 'react';
import { Card, Col, Rate, Row, Image, Alert, Tooltip, Button, Modal, notification } from 'antd';
import { ICakeInterface } from '../../interfaces/cake.interface';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { useUpdateCakeContext } from '../../context/cake.context';
import { IAPIResponse } from '../../interfaces/api-response.interface';

function CakeList() {
    const [cakes, setCakes] = useState<ICakeInterface[]>([]);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [cakeIdToDelete, setCakeIdToDelete] = useState<number | null>();
    const [editCakeRoute, setEditCakeRoute] = useState(<></>);
    const { setCakeToUpdate } = useUpdateCakeContext();

    async function fetchCakeList() {
        const cakeListResult = await fetch(`${process.env.REACT_APP_API_END_POINT || 'http://localhost:3100'}/cake/list`);
        const cakeListJson: IAPIResponse = await cakeListResult.json();
        if (cakeListJson.ok) {
            setCakes(cakeListJson.data);
        } else {
            notification['error']({
                message: 'Error',
                description: cakeListJson.message
            });
        }
    }

    useEffect(() => {
        fetchCakeList();
    }, []);

    const hideModal = () => {
        setCakeIdToDelete(null);
        setShowDeleteConfirmModal(false);
    };

    const deleteCake = async () => {
        try {
            const cakeDeleteResult = await fetch(`${process.env.REACT_APP_API_END_POINT || 'http://localhost:3100'}/cake/delete/${cakeIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const cakeDeleteResultJson = await cakeDeleteResult.json();
            if (cakeDeleteResultJson.ok) {
                notification['success']({
                    message: 'Success',
                    description: 'Cake removed from inventory.',
                });
            } else {
                notification['error']({
                    message: 'Error',
                    description: cakeDeleteResultJson.message,
                });
            }
            hideModal();
            await fetchCakeList();
        } catch (e) {
            notification['error']({
                message: 'Error',
                description: 'Error occurred while removing the cake. Please try again.',
            });
        }
    };

    const editCake = (cake: ICakeInterface) => {
        setCakeToUpdate(cake);
        setEditCakeRoute(<Redirect to="/update-cake" />);
    };

    const openConfirmDeleteModal = (cakeId: number) => {
        setCakeIdToDelete(cakeId);
        setShowDeleteConfirmModal(true);
    };

    let content = cakes.map(cake => {
        return (
            <Col xs={24} sm={12} md={8} lg={8} key={cake.id}>
                <Card title={cake.name} extra={
                    <span>
                        <Tooltip title="Remove from inventory">
                            <Button danger shape="circle" icon={< DeleteOutlined />} onClick={() => openConfirmDeleteModal(cake.id!)} />
                        </Tooltip>
                        &nbsp;
                        <Tooltip title="Change cake details">
                            <Button shape="circle" icon={<EditOutlined />} onClick={() => editCake(cake)} />
                        </Tooltip>
                    </span>}>
                    <Image
                        width={'100%'}
                        src={cake.imageUrl}
                    />
                    <p>{cake.comment}</p>
                    <Rate value={cake.yumFactor} disabled={true} />
                </Card>
            </Col>
        );
    });
    if (!content.length) {
        content = [<Alert key='0' style={{ flex: 1, textAlign: 'center' }} message="There is no cake in the inventory. Please add a new cake." type="info" />];
    }
    return (
        <>
            <Row gutter={[10, 10]}>
                {content}
                <Modal
                    title="Modal"
                    visible={showDeleteConfirmModal}
                    onOk={deleteCake}
                    okButtonProps={{ danger: true }}
                    onCancel={hideModal}
                    okText="Yes"
                    cancelText="No"
                >
                    <span>Are you sure you want to remove the cake?</span>
                </Modal>
            </Row>
            {editCakeRoute}
        </>
    );
}

export default CakeList;