import Image from "next/image";
import hosts from "@/config/hosts.json";

const hostGroups = [
  { gender: "male", title: "Эрэгтэй хөтлөгчид" },
  { gender: "female", title: "Эмэгтэй хөтлөгчид" },
];

export function HostGallery() {
  return (
    <div className="host-gallery">
      <h3 className="host-gallery-title">Хөтлөгчид</h3>
      {hostGroups.map((group) => (
        <div className="host-group" key={group.gender}>
          <h4 className="host-group-title">{group.title}</h4>
          <div className="host-grid">
            {hosts
              .filter((host) => host.gender === group.gender)
              .map((host) => (
                <article className="team-one__single" key={host.image}>
                  <div className="team-one__img-box">
                    <div className="team-one__img">
                      <Image
                        src={host.image}
                        alt={host.name}
                        width={host.width}
                        height={host.height}
                        sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 400px"
                      />
                    </div>
                    <div className="team-one__content">
                      <h5 className="team-one__name">{host.name}</h5>
                      <p className="team-one__sub-title">{host.role}</p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
