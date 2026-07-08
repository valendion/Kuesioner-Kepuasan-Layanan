export const POST = async (request) => {
  try {
    const body = await request.json();

    // Validasi required fields
    const required = [
      "age",
      "gender",
      "education",
      "occupation",
      "services_received",
      "answers",
    ];
    for (const field of required) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        return NextResponse.json(
          { message: `Field '${field}' wajib diisi` },
          { status: 400 },
        );
      }
    }

    const patient = await prisma.patient.create({
      data: {
        age: Number(body.age),
        gender: body.gender,
        education: body.education,
        occupation: body.occupation,
        services_received: body.services_received,
        answers: JSON.stringify(body.answers),
        suggestion: body.suggestion || null, // handle undefined
      },
    });

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
