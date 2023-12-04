import { Number, Time } from "../utils"

export const MODAL_OPTIONS = {
    KONFIRMASI: {
        type: 'blue',
        body: 'Konfirmasi'
    },
    SETUJU: {
        type: 'blue',
        body: 'Oke, Setuju!'
    },
    LANJUT: {
        type: 'blue',
        body: 'Lanjut'
    },
    COBA_LAGI: {
        type: 'danger',
        body: 'Coba Lagi'
    },
    IZIN_PULANG: {
        type: 'danger',
        body: 'Izin pulang',
    },
    SELESAI: {
        type: 'blue',
        body: 'Selesai',
    },
}

export const MODAL_MESSAGE = {
    DENIED_BELUM_CHECKOUT: {
        title: 'Akses ditolak',
        body: 'Sistem mendeteksi anda belum mengakhiri absensi kemarin. Untuk dapat mengakses fitur ini anda perlu mengkonfirmasi ke admin!',
    },
    DENIED_TIDAK_HADIR: {
        title: 'Akses ditolak',
        body: 'Anda tidak dapat mengakses fitur ini karena sedang dalam status tidak hadir.',
    },
    DENIED_HADIR: {
        title: 'Akses ditolak',
        body: 'Anda tidak dapat mengakses fitur ini karena sedang dalam status hadir.',
    },
    SENT_FORGOT_PASSWORD: {
        title: 'Sudah terkirim',
        body: 'Segera hubungi admin untuk mendapatkan password baru!'
    },
    DENIED_TIDAK_DI_KANTOR: (distance) => {
        return {
            title: 'Anda tidak berada di sekitar kantor',
            body: `Untuk dapat mengakses WFO, anda harus berada di sekitar kantor. Jarak anda : ${Number.formatNumberToReadable(distance)} meter`
        }
    },
    DENIED_SUDAH_SELESAI_ABSEN: {
        title: 'Anda sudah selesai bekerja.',
        body: 'Anda dapat mengakses fitur ini besok.'
    },
    LEMBUR_START: {
        title: 'Lembur dimulai',
        body: 'Anda telah memasuki jam lembur!'
    },
    DENIED_WORKING_HOURS: (hour) => {
        return {
            title: 'Akses ditolak',
            body: `Anda belum boleh mengakhiri absensi sebelum 8 jam kerja. Waktu kerja anda : ${Time.formatWorkingHours(hour)} Jika ada keadaan mendesak anda dapat mengajukan izin ke admin.`,
        }
    },
    PENGAJUAN_SENT: {
        title: 'Pengajuan anda sudah terkirim',
        body: 'Harap menunggu pengajuan disetujui oleh admin.'
    },
    KERJA_SELESAI: {
        title: 'Kerja selesai',
        body: 'Selamat beristirahat!'
    },
    KERJA_STARTED: {
        title: 'Kamu berhasil absen',
        body: 'Selamat bekerja!'
    },
    WFA_STARTED: {
        title: 'Berhasil',
        body: 'Karena pengajuan dilakukan hari ini jadi kamu dapat langsung melaksanakan tugasmu secara WFA.'
    },
    LANJUR_KANTOR: {
        title: 'Lanjut ke kantor',
        body: 'Kamu perlu melanjutkan kerja di kantor untuk memenuhi 8 jam kerja!'
    },
    IZIN_SAKIT_SENT: {
        title: 'Perizinanmu sudah terkirim',
        body: 'Selamat beristirahat!'
    },
    SURAT_IZIN_SENT: {
        title: 'Suratmu sudah terkirim',
        body: 'Selamat beristirahat!'
    }
}

export const VECTOR_TITLES = {
    WFO: {
        WORKING:"Selamat Bekerja!",
        DEFAULT:"Anda belum absen"
    },
    WFH: {
        APPROVED: "Pengajuan WFH Disetujui",
        PENDING: 'Pengajuan Dalam Proses',
        DEFAULT: "Pengajuan WFH"
    },
    WFA: {
        WORKING: "Selamat Bekerja!",
        PENDING: 'Pengajuan Dalam Proses',
        IS_SCHEDULED_TODAY: "Jadwal WFA"
    },
    SAKIT: {
        SENT: 'Perizinanmu terkirim',
        DEFAULT: 'Perizinan Sakit'
    }
}

export const VECTOR_DESC = {
    WFO: {
        WORKING: "Anda dapat menekan tombol pulang setelah 8 jam kerja atau saat keadaan mendesak",
        DEFAULT: "Jangan lupa klik tombol absen sebelum kerja",
        LEMBUR: "Anda sedang berada pada jam lembur"
    },
    WFH: {
        PENDING: 'Pengajuanmu sedang diproses, harap menunggu',
        DEFAULT: "Kerja remote dari rumah tanpa harus ke kantor"
    },
    WFA: {
        WORKING: "Anda dapat menekan tombol pulang setelah 8 jam kerja atau saat keadaan mendesak",
        PENDING: 'Pengajuanmu sedang diproses, harap menunggu',
        IS_SCHEDULED_TODAY: "Anda sudah menjadwalkan WFA untuk hari ini. Anda dapat langsung memulai WFA."
    },
    SAKIT: {
        SENT: 'Tidak perlu khawatir dengan status absensi anda',
        DEFAULT: 'Ajukan perizinan jika anda merasa sakit.'
    }
}