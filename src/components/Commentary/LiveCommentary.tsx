import CommentaryBox from "../Commentary/CommentaryBox.tsx";
import { liveComments } from "../Data/LiveComments";

function LiveCommentary() {
    return (
        <CommentaryBox
            title="Live Commentary"
            comments={liveComments}
        />
    );
}

export default LiveCommentary;