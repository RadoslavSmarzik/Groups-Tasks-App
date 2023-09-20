import MemberCard from "./MemberCard"
import "./AllMembersCards.css"

const AllMembersCards = ({ team }) => {

  return (
    <div className="all-members-cards">
        {
            team.members.map( (oneMember) => {
                return <div key={oneMember.id}>
                    <MemberCard member = {oneMember} team = {team}></MemberCard>
                </div>
            })
        }
    </div>
  )
}

export default AllMembersCards