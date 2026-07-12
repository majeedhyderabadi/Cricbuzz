import { useEffect, useState } from "react";
import { approveAdmin, getAdminApprovalRequests ,type  AdminApprovalRequest } from "../../services/adminservice";
import "./AdminApproval.css";

function AdminApproval() {

    const [approvalRequests, setApprovalRequests] = useState<AdminApprovalRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApprovalRequests = async () => {
            try {
                const data = await getAdminApprovalRequests();
                setApprovalRequests(data);
            } catch (error) {
                console.error(error);
                setError("Failed to load approval requests");
            } finally {
                setLoading(false);
            }
        };

        fetchApprovalRequests();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await approveAdmin(id);

            setApprovalRequests((prev) =>
                prev.filter((admin) => admin.id !== id)
            );

            alert("Admin approved successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to approve admin");
        }
    };

    if (loading) {
        return <p>Loading approval requests...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="admin-approval">
            <h2>Admin Approval Requests</h2>

            {approvalRequests.length === 0 ? (
                <p>No pending approval requests.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {approvalRequests.map((admin) => (
                            <tr key={admin.id}>
                                <td>
                                    {admin.firstName} {admin.lastName}
                                </td>

                                <td>{admin.email}</td>

                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="approve-btn"
                                            onClick={() => handleApprove(admin.id)}
                                        >
                                            Approve
                                        </button>

                                        <button className="reject-btn">
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default AdminApproval;

