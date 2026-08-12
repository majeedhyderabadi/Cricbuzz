import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    type Team,
    getTeams,
    getPlayers
} from "../services/TeamService";

import {
    type Sport,
    type SportRole,
    getSports,
    getSportRolesBySportId
} from "../services/SportService";

interface TeamSportPlayerContextType {

    teams: Team[];
    sports: Sport[];
    roles: SportRole[];

    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    setSports: React.Dispatch<React.SetStateAction<Sport[]>>;
    setRoles: React.Dispatch<React.SetStateAction<SportRole[]>>;

    loadTeams(): Promise<void>;
    loadSports(): Promise<void>;
    loadPlayers(teamId?: string): Promise<void>;
    loadRolesBySportById(sportId: string): Promise<void>;
}

const TeamSportPlayerContext =
    createContext<TeamSportPlayerContextType | null>(null);

export const TeamSportPlayerDataProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const [teams, setTeams] = useState<Team[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [roles, setRoles] = useState<SportRole[]>([]);

    const loadTeams = async () => {
        const data = await getTeams();
        setTeams(data);
    };

    const loadSports = async () => {
        const data = await getSports();
        setSports(data);
    };

    const loadPlayers = async (teamId?: string) => {
        if (!teamId) return;

        const players = await getPlayers(teamId);

        setTeams(prev =>
            prev.map(team =>
                team.id === teamId
                    ? {
                        ...team,
                        players
                    }
                    : team
            )
        );
    };

    const loadRolesBySportById = async (
        sportId: string
    ) => {

        const data =
            await getSportRolesBySportId(sportId);

        setRoles(data);
    };

    useEffect(() => {

        loadSports();
        loadTeams();

    }, []);

    return (

        <TeamSportPlayerContext.Provider
            value={{
                teams,
                sports,
                roles,

                setTeams,
                setSports,
                setRoles,

                loadTeams,
                loadSports,
                loadPlayers,
                loadRolesBySportById
            }}
        >
            {children}
        </TeamSportPlayerContext.Provider>

    );
};

export const useTeamSportPlayerData = () => {

    const context = useContext(TeamSportPlayerContext);

    if (!context) {
        throw new Error(
            "useTeamSportPlayerData must be used inside TeamSportPlayerProvider"
        );
    }

    return context;
};