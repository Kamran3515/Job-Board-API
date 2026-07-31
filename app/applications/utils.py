from accounts.models import Profile


def build_profile_snapshot(profile: Profile) -> dict:

    return {

        "username": profile.user.username,

        "email": profile.user.email,

        "first_name": profile.first_name,

        "last_name": profile.last_name,

        "phone": profile.phone,

        "location": profile.location,

        "bio": profile.bio,

        "github": profile.github,

        "linkedin": profile.linkedin,

        "website": profile.website,

        "skills": [

            skill.name

            for skill in profile.skills.all()

        ],

        "resume": profile.resume.url if profile.resume else None,

    }