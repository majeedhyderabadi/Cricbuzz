import CommentaryBox from "../Commentary/CommentaryBox.tsx";
import { nvianComments } from "../Data/NVianComments.tsx";

function NVianCommentary() {
    return (
        <CommentaryBox
            title="NVian Commentary"
            comments={nvianComments}
            
        />
    );
}

export default NVianCommentary;