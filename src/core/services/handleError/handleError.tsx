import Swal from 'sweetalert2';

export const HandleError = (err: any) => {
  const errRes = err.response;
  const message = (errRes && errRes?.data.message) || err.statusText || err.message || '';
  const status = err.status || errRes?.data.statusCode || errRes?.status || err['statusCode'] || 0;

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  switch (status) {
    case 400:
      if (typeof message == 'string') {
        switch (message) {
          case 'flipchart should not be empty':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Foto wajib di upload',
            });
            break;
          case 'wrong application':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Anda Tidak Diperbolehkan Login',
            });
            break;
          case 'Request validation of body failed, because: "phone" length must be less than or equal to 13 characters long':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Nomor Telp tidak boleh melebihi 13',
            });
            break;
          case 'invalid old password !':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Kata Sandi Lama Tidak Sesuai',
            });
            break;
          case 'Request validation of body failed, because: "newPassword" length must be at least 4 characters long':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Panjang Kata Sandi Baru Minimal 4 Karakter',
            });
            break;
          case 'Request validation of body failed, because: "confirmNewPassword" must be [ref:newPassword]':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Kata Sandi Baru dan Konfirmasi Tidak Sesuai',
            });
            break;
          case 'Nama atau NO.Urut Sudah Ada':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Nama atau No Urut Sudah Ada',
            });
            break;
          case 'No.WhatsApp sudah di daftarkan ':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'No.WhatsApp sudah di daftarkan',
            });
            break;
          case 'Akun telah didaftarkan':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Akun telah didaftarkan',
            });
            break;
          case 'category must fill':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Kategori wajib di isi',
            });
            break;
          case 'Witness already added':
          case 'Witness Coordinator already added':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'No KTP sudah terdaftar',
            });
            break;
          case 'Sequence Sudah Ada':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Mohon Masukan No. Urut Yang Berbeda',
            });
            break;
          case 'Nomor urut already exist':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Mohon Masukan No. Urut Yang Berbeda',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Terdapat kesalahan',
              footer: `err: (${status}) ${message || ''}`,
            });
            break;
        }
      } else {
        message.forEach((el: string) => {
          switch (el) {
            case 'data_valid_vote must not be greater than 999':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Suara Sah Harus Lebih Kecil dari 999',
              });
              break;
            case 'description should not be empty':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Deskripsi tidak boleh kosong',
              });
              break;
            case 'name should not be empty':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Nama wajib di isi',
              });
              break;
            case 'id_card must be longer than or equal to 16 characters"':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'No KTP harus 16 karakter',
              });
              break;
            case 'id_card should not be empty':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'No KTP tidak boleh kosong',
              });
              break;
            case 'name must match ^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$ regular expression':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Nama tidak boleh terdapat simbol',
              });
              break;
            case 'phone must be a valid phone number':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'No Telp harus berisi nomor',
              });
              break;
            case 'level must be a valid enum value':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Level tidak terdaftar',
              });
              break;
            case 'level should not be empty':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Level tidak boleh kosong',
              });
              break;
            case 'ordinal must be a positive number':
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Ordinal Harus Lebih Dari 0',
              });
              break;
            default:
              Swal.fire({
                icon: 'error',
                title: 'Error !',
                text: 'Terdapat Kesalahan Di Input Anda',
                footer: `err: (${status}) ${el || ''}`,
              });
              break;
          }
        });
      }
      break;

    case 200:
      if (typeof message == 'string') {
        switch (message) {
          case 'Akun telah didaftarkan"':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Akun telah didaftarkan"',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Terdapat kesalahan',
              footer: `err: (${status}) ${message || ''}`,
            });
            break;
        }
      }
      break;

    case 401:
      if (typeof message == 'string') {
        switch (message) {
          case 'Unauthorized':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Token Kadaluarsa !, Harap Login Kembali',
            }).then((res) => {
              if (res.isConfirmed) {
                window.localStorage.clear();
                deleteCookie('token');
                window.location.href = '/';
              }
            });
            break;
          case 'Invalid password !':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Password Salah !',
            });
            break;
          case 'User not registered !':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Akun belum terdaftar',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Terdapat kesalahan',
              footer: `err: (${status}) ${message || ''}`,
            });
            break;
        }
      }
      break;
    case 403:
      Swal.fire({
        icon: 'error',
        title: 'Error !',
        text: 'Anda Tidak Mempunyai Hak Akses',
      });
      break;
    case 404:
      switch (message) {
        case 'Data not found':
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: 'Data Tidak Ditemukan',
          });
          break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: 'Terdapat Kesalahan Di Input Anda',
            footer: `err: (${status}) ${message || ''}`,
          });
          break;
      }
      break;

    case 406:
      switch (message) {
        case 'user Coordinator exsist':
        case 'user exsist':
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: 'No Telp sudah Terdaftar',
          });
          break;

        default:
          Swal.fire({
            icon: 'error',
            title: 'Error !',
            text: 'Terdapat kesalahan',
            footer: `err: (${status}) ${message || ''}`,
          });
          break;
      }
      break;

    case 500:
      Swal.fire({
        icon: 'error',
        title: 'Error !',
        text: 'Terdapat Kesalahan di Server',
      });
      break;

    default:
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Terdapat Kesalahan',
        footer: `err: (${status}) ${message || ''}`,
      });
      break;
  }
};
